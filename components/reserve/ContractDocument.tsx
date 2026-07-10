"use client";

import type { ReactNode } from "react";
import {
  SCREEN_TIERS,
  CONTRACT_VERSION,
  type ScreenTierId,
} from "@/lib/reserve-form-schema";

export { CONTRACT_VERSION };

export type ContractData = {
  companyName: string;
  venueAddress: string;
  kvk?: string;
  eventType: string;
  eventLocation: string;
  eventStart: string; // datetime-local value
  expectedAttendees: string;
  deploymentAt: string; // datetime-local value
  screenTier: ScreenTierId | "";
};

function fmtDate(value: string): string {
  if (!value) return "[nader te bepalen]";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "[nader te bepalen]";
  return d.toLocaleString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// A filled placeholder if data exists, else a visible bracket the reader understands.
function ph(value: string | undefined, fallback: string) {
  return value && value.trim() ? value : `[${fallback}]`;
}

// This is the Product- & Dienstenovereenkomst rendered inline in the reserve
// form (contract §5.1 tiers, §7.1 install window). It is intentionally kept
// in Dutch only, regardless of site locale — it's a single binding legal
// document and must not diverge into an untranslated-by-a-lawyer English
// version.
export function ContractDocument({ data }: { data: ContractData }) {
  const tier = data.screenTier ? SCREEN_TIERS[data.screenTier] : null;

  return (
    <article className="max-h-[60vh] overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-700">
      <p>
        <strong>TUSSEN DE VOLGENDE PARTIJEN:</strong>
      </p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Powerdon</strong> (&ldquo;Powerdon&rdquo;), een vennootschap
          opgericht naar Nederlands recht, met statutaire zetel te
          Luzacstraat, 3038 VT, Rotterdam.
        </li>
        <li>
          <strong>{ph(data.companyName, "Naam van Partij")}</strong>{" "}
          (&ldquo;Partner&rdquo;), opgericht naar het recht van Nederland, met
          statutaire zetel te {ph(data.venueAddress, "Adres")}, en
          registratienummer/KvK: {ph(data.kvk, "KvK")}.
        </li>
      </ul>

      <Heading>1. Overwegingen</Heading>
      <p>
        A. Powerdon exploiteert een netwerk van draagbare, snellaadbare
        powerbanks en laadstations voor evenementen en biedt digitale
        advertentieruimte op schermen tijdens evenementen.
      </p>
      <p>
        B. {ph(data.companyName, "Naam van Partij")} organiseert een{" "}
        {ph(data.eventType, "Type Evenement")} (het &ldquo;Type
        Evenement&rdquo;) dat plaatsvindt te{" "}
        <strong>{ph(data.eventLocation, "Locatie")}</strong> op{" "}
        <strong>{fmtDate(data.eventStart)}</strong> (het
        &ldquo;Evenement&rdquo;), met een verwachte opkomst van{" "}
        <strong>{ph(data.expectedAttendees, "aantal bezoekers")}</strong>, en
        wenst Powerdon in te schakelen voor het leveren van laadservices en
        advertentiediensten zoals hieronder uiteengezet.
      </p>
      <p>
        C. Deze Overeenkomst is uitsluitend van toepassing op het hierboven
        genoemde enkele Evenement en schept geen doorlopende of terugkerende
        verplichtingen buiten dit Evenement.
      </p>
      <p>D. Partijen wensen hun afspraken schriftelijk vast te leggen.</p>

      <Heading>2. Definities</Heading>
      <ul className="list-disc pl-5">
        <li>
          <strong>&ldquo;Evenement&rdquo;:</strong> het in artikel 1.B genoemde
          evenement.
        </li>
        <li>
          <strong>&ldquo;Type Evenement&rdquo;:</strong> de categorie of aard
          van het Evenement zoals vermeld in artikel 1.B.
        </li>
        <li>
          <strong>&ldquo;Verwachte Opkomst&rdquo;:</strong> het totale aantal
          bezoekers dat naar verwachting het Evenement zal bijwonen.
        </li>
        <li>
          <strong>&ldquo;Units&rdquo;:</strong> de door Powerdon geleverde
          draagbare powerbanks, opladers, dockingstations en bijbehorende
          apparatuur.
        </li>
        <li>
          <strong>&ldquo;Scherm(en)&rdquo;:</strong> digitale schermen die door
          Powerdon worden geleverd voor advertentiedoeleinden, met
          specificaties zoals opgenomen in Bijlage A.
        </li>
        <li>
          <strong>&ldquo;Advertentie-inhoud&rdquo; (Ad Content):</strong> alle
          creatieve materialen, advertentieboodschappen, afbeeldingen, video-
          of audiomateriaal dat wordt afgespeeld op schermen die door Powerdon
          worden beheerd.
        </li>
        <li>
          <strong>&ldquo;Evenementlocatie&rdquo;:</strong> de gedeelten van de
          locatie waar de Units of Schermen worden geplaatst.
        </li>
      </ul>

      <Heading>3. Duur &amp; Reikwijdte</Heading>
      <p>
        <strong>3.1 Duur.</strong> Deze Overeenkomst treedt in werking op de
        datum van ondertekening en eindigt nadat Powerdon alle Units en
        apparatuur van de evenementlocatie heeft verwijderd en de definitieve
        financiële afrekening heeft plaatsgevonden (tenzij eerder beëindigd
        overeenkomstig artikel 14). Deze Overeenkomst is uitsluitend van
        toepassing op het Evenement en schept geen verplichtingen voor
        toekomstige evenementen.
      </p>
      <p>
        <strong>3.2 Enkel evenement.</strong> Partijen erkennen dat deze
        Overeenkomst betrekking heeft op één enkel Evenement. Voor eventuele
        toekomstige evenementen is een afzonderlijke schriftelijke
        overeenkomst tussen Partijen vereist.
      </p>

      <Heading>4. Reikwijdte van de Diensten</Heading>
      <p>
        <strong>4.1 Powerbanks &amp; Stations.</strong> Powerdon zal de Units
        leveren, installeren, exploiteren en na afloop ophalen op de
        Evenementlocatie. De diensten omvatten onder meer: levering,
        installatie, testen, inzet van personeel gedurende de overeengekomen
        uren, basisonderhoud, reiniging en desinfectie, en verwijdering na
        afloop van het Evenement.
      </p>
      <p>
        <strong>4.2 Advertentiediensten.</strong> Powerdon zal de Partner
        digitale advertentieruimte aanbieden op de schermen zoals beschreven
        in Bijlage A. De afmetingen, locaties en technische specificaties zijn
        opgenomen in Bijlage A. Powerdon beheert de Schermen en zorgt voor de
        geplande weergave van Advertentie-inhoud overeenkomstig het
        overeengekomen advertentieschema.
      </p>
      <p>
        <strong>4.3 Gebruik van Scherm door Partner.</strong> De Partner heeft
        het recht om eigen content te tonen op de Schermen, zoals
        evenementinformatie, sponsorberichten, programma&rsquo;s en andere
        evenement gerelateerde informatie. Dit gebeurt in overleg met
        Powerdon. De content dient te voldoen aan de technische specificaties
        (Bijlage A) en de inhoudelijke vereisten (artikel 11).
      </p>
      <p>
        <strong>4.4 Serviceniveau.</strong> Powerdon zal zich naar beste
        vermogen inspannen om ervoor te zorgen dat de Units operationeel zijn
        gedurende de openingstijden van het Evenement en om supportverzoeken
        te behandelen zoals uiteengezet in de Bijlage.
      </p>

      <Heading>5. Vergoedingen, Betaling &amp; Borg</Heading>
      <p>
        <strong>5.1 Servicevergoeding voor gebruik van powerbanks.</strong> De
        Partner stemt ermee in Powerdon tijdens het Evenement de mogelijkheid
        te bieden haar powerbank-verhuurservice te exploiteren zonder daarvoor
        kosten in rekening te brengen, met uitzondering van eventuele kosten
        voor elektriciteitsgebruik van de locatie. Powerdon levert de
        apparatuur en beheert alle transacties met bezoekers rechtstreeks. De
        Partner kan kiezen uit de volgende opties:
      </p>

      <div className="my-3 flex flex-col gap-2">
        <TierRow highlighted={data.screenTier === "none"} title="Tier 1 — Basis">
          30% aandeel in de verhuurinkomsten. Geen gebruik van schermen buiten
          het festivalscherm.
        </TierRow>
        <TierRow
          highlighted={data.screenTier === "event_display"}
          title="Tier 2 — Evenementweergave inbegrepen"
        >
          20% aandeel in de verhuurinkomsten. Het scherm toont het programma,
          toekomstige aankondigingen en een QR-code. Beperkte
          advertentierotatie (40%).
        </TierRow>
        <TierRow
          highlighted={data.screenTier === "full_branding"}
          title="Tier 3 — Volledige brandingcontrole"
        >
          Geen aandeel in de verhuurinkomsten. Het scherm staat volledig onder
          controle van het evenement.
        </TierRow>
      </div>
      <p>
        <em>
          Gekozen niveau op basis van uw aanvraag:{" "}
          <strong>{tier ? tier.contractTier : "[nog te specificeren]"}</strong>
          .
        </em>
      </p>

      <p>
        <strong>5.2 Gebruiksvergoeding voor bezoekers.</strong> Elke bezoeker
        die een Powerdon-powerbank huurt betaalt een borg van € 28,00 bij het
        huren. Daarnaast geldt een gebruikstarief van € 1 per periode van 15
        minuten. Betaling verloopt rechtstreeks aan Powerdon via het
        Powerdon-platform, de mobiele applicatie of het betalingssysteem op
        locatie. De totale gebruikskosten worden verrekend met de betaalde
        borg; een eventueel resterend saldo wordt onmiddellijk terugbetaald
        bij correcte retournering. Wordt de powerbank niet geretourneerd, dan
        behoudt Powerdon de borg ter vervanging. De Partner is niet
        verantwoordelijk voor het innen, beheren, betalen of terugbetalen van
        deze bedragen. Powerdon behoudt 100% van de geïnde vergoedingen en
        borgbedragen, tenzij anders bepaald in de Bijlage.
      </p>
      <p>
        <strong>5.3 Advertentievergoedingen.</strong> Advertentieruimte op de
        Powerdon-schermen wordt voor dit specifieke evenement kosteloos
        beschikbaar gesteld, aangezien het een pilotproject in een nieuwe
        markt betreft.
      </p>
      <p>
        <strong>5.4 Borg.</strong> Voor dit evenement is geen restitueerbare
        borg van toepassing, om de reden zoals vermeld in artikel 5.3.
      </p>
      <p>
        <strong>5.5 Betalingsvoorwaarden.</strong> Er zijn geen kosten (€ 0)
        verschuldigd met betrekking tot geschatte niet-gebruikersgerelateerde
        kosten (zoals advertentieruimte of operationele kosten) bij
        ondertekening. De bepaling dat een resterend bedrag uiterlijk 14 dagen
        vóór de startdatum moet worden betaald, is niet van toepassing indien
        dit artikel geldt. Een eventuele eindafrekening dient binnen 14 dagen
        na factuurdatum te worden voldaan.
      </p>
      <p>
        <strong>5.6 Belastingen.</strong> Alle bedragen zijn exclusief btw en
        andere toepasselijke belastingen, welke door de Partner worden betaald
        indien en voor zover wettelijk vereist.
      </p>

      <Heading>6. Verplichtingen voorafgaand aan het Evenement</Heading>
      <p>
        <strong>6.1 Aanleveren van content.</strong> De Partner (of diens
        adverteerders) levert de Advertentie-inhoud aan in het technische
        formaat van Bijlage A, uiterlijk 5 dagen vóór het Evenement.
      </p>
      <p>
        <strong>6.2 Toegang tot locatie en voorbereiding.</strong> De Partner
        verleent Powerdon toegang tot de Evenementlocatie en draagt zorg voor
        geldige vergunningen, elektriciteitsaansluitingen, WiFi en een veilige
        opslagruimte voor apparatuur.
      </p>

      <Heading>7. Levering, Installatie &amp; Setup</Heading>
      <p>
        <strong>7.1 Installatieschema.</strong> Powerdon levert en installeert
        de Units en Schermen op <strong>{fmtDate(data.deploymentAt)}</strong>{" "}
        en rondt de installatie af vóór aanvang van het Evenement. De
        installatie duurt naar verwachting circa 20 minuten.
      </p>
      <p>
        <strong>7.2 Testen en verificatie.</strong> Na installatie test
        Powerdon alle apparatuur om te waarborgen dat deze operationeel is
        vóór aanvang van het Evenement.
      </p>

      <Heading>8. Evenementuitvoering</Heading>
      <p>
        <strong>8.1 Operationele voorwaarden.</strong> Powerdon zet
        bewegwijzering en personeel in om gebruikers tijdens het Evenement te
        informeren en te begeleiden.
      </p>
      <p>
        <strong>8.2 Samenwerking van de Partner.</strong> De Partner attendeert
        bezoekers op de Units en promoot de service via communicatiekanalen
        van het evenement (Instagram, LinkedIn en/of fysieke bewegwijzering).
      </p>
      <p>
        <strong>8.3 Personeel.</strong> Powerdon zet personeel in gedurende de
        overeengekomen operationele uren om de Units te beheren en vragen te
        beantwoorden.
      </p>

      <Heading>9. Verwijdering na het Evenement &amp; Afrekening</Heading>
      <p>
        <strong>9.1 Verwijderingsschema.</strong> Powerdon begint met
        verwijdering van de apparatuur na afloop van het Evenement en
        voltooit dit binnen de overeengekomen termijn.
      </p>
      <p>
        <strong>9.2 Eindafrekening.</strong> Binnen 7 werkdagen na afloop
        verstrekt Powerdon een definitieve afrekening, inclusief aanpassingen
        voor afwijkingen in bezoekersaantallen, schade, verlies of aanvullende
        diensten.
      </p>

      <Heading>10. Verlies, Schade &amp; Aansprakelijkheid</Heading>
      <p>
        <strong>10.1 Verlies en schade.</strong> De Partner is verantwoordelijk
        voor redelijke beveiliging van de locatie.
      </p>
      <p>
        <strong>10.2 Aansprakelijkheidsbeperking.</strong> De totale
        aansprakelijkheid van iedere Partij (met uitzondering van artikel
        10.3) is beperkt tot het totale bedrag aan vergoedingen dat door de
        Partner aan Powerdon is betaald overeenkomstig artikel 5.5. Geen van
        de Partijen is aansprakelijk voor indirecte, bijzondere of
        gevolgschade, behoudens voor zover uitsluiting niet is toegestaan
        onder toepasselijk recht.
      </p>
      <p>
        <strong>10.3 Vrijwaring.</strong> Iedere Partij vrijwaart de andere
        voor aansprakelijkheden die voortvloeien uit haar eigen nalatigheid,
        opzettelijk wangedrag of overtreding van toepasselijke wetgeving, met
        de nuances zoals in de Overeenkomst bepaald.
      </p>

      <Heading>11. Normen voor advertentie-inhoud</Heading>
      <ul className="list-disc pl-5">
        <li>
          Powerdon behoudt zich het recht voor Advertentie-inhoud te weigeren
          die onrechtmatig, misleidend, lasterlijk, pornografisch is of
          inbreuk maakt op rechten van derden.
        </li>
        <li>
          De Partner garandeert gerechtigd te zijn de Advertentie-inhoud te
          gebruiken en te vertonen, en vrijwaart Powerdon tegen aanspraken van
          derden.
        </li>
        <li>
          Alle content dient passend te zijn voor het Type Evenement en de
          verwachte doelgroep.
        </li>
      </ul>

      <Heading>12. Verzekering</Heading>
      <p>
        De Partner draagt zorg voor een geldige aansprakelijkheidsverzekering
        voor de locatie en, indien van toepassing, aanvullende verzekeringen
        vereist voor het Evenement.
      </p>

      <Heading>13. Gegevensbescherming &amp; Privacy</Heading>
      <p>
        Powerdon kan geanonimiseerde gebruiksgegevens verzamelen. Verwerking
        van persoonsgegevens vindt plaats in overeenstemming met de AVG/GDPR.
        De Partner zorgt dat bezoekers passend worden geïnformeerd en, indien
        vereist, toestemming geven.
      </p>

      <Heading>14. Publiciteitsrechten</Heading>
      <p>
        De Partner verleent Powerdon het recht de samenwerking te vermelden en
        te promoten, waaronder gebruik van naam, logo en foto-/videomateriaal
        waarop Powerdon-apparatuur zichtbaar is. Dit geschiedt voor rekening
        van Powerdon en zonder financiële verplichting jegens de Partner,
        tenzij schriftelijk anders overeengekomen. Powerdon respecteert
        daarbij de reputatie en het merkimago van de Partner.
      </p>

      <Heading>15. Beëindiging &amp; Annulering</Heading>
      <p>
        <strong>15.1 Beëindiging wegens contractbreuk.</strong> Elke Partij kan
        beëindigen indien de andere toerekenbaar tekortschiet en dit niet
        binnen 7 dagen na schriftelijke kennisgeving herstelt.
      </p>

      <Heading>16. Overmacht</Heading>
      <p>
        Geen van de Partijen is aansprakelijk voor tekortkoming of vertraging
        door omstandigheden buiten haar redelijke controle. De getroffen
        Partij stelt de andere zo spoedig mogelijk schriftelijk op de hoogte.
      </p>

      <Heading>17. Garanties &amp; Disclaimers</Heading>
      <p>
        Powerdon garandeert dat de Units en Schermen bij levering in werkende
        staat verkeren. Voor het overige worden diensten en apparatuur
        geleverd in de staat waarin zij zich bevinden, en sluit Powerdon
        overige garanties uit voor zover toegestaan.
      </p>

      <Heading>18. Vertrouwelijkheid</Heading>
      <p>
        Iedere Partij behandelt ontvangen vertrouwelijke informatie strikt
        vertrouwelijk, behalve waar openbaarmaking noodzakelijk is aan
        gebonden werknemers, opdrachtnemers of adviseurs.
      </p>

      <Heading>19. Toepasselijk recht &amp; Geschillenbeslechting</Heading>
      <p>
        Op deze Overeenkomst is uitsluitend Nederlands recht van toepassing.
        Geschillen worden bij voorkeur in onderling overleg opgelost; bij
        gebreke daarvan voorgelegd aan de bevoegde rechter te Rotterdam,
        tenzij Partijen gezamenlijk kiezen voor mediation of arbitrage.
      </p>

      <Heading>20. Overige bepalingen</Heading>
      <ul className="list-disc pl-5">
        <li>
          <strong>Overdracht:</strong> geen overdracht van
          rechten/verplichtingen zonder voorafgaande schriftelijke
          toestemming, behoudens aan een gelieerde onderneming of bij verkoop
          van nagenoeg alle activa.
        </li>
        <li>
          <strong>Volledige overeenkomst:</strong> deze Overeenkomst,
          inclusief bijlagen, vormt de volledige overeenkomst en vervangt
          eerdere afspraken.
        </li>
        <li>
          <strong>Scheidbaarheid:</strong> ongeldigheid van een bepaling laat
          de overige bepalingen onverlet.
        </li>
        <li>
          <strong>Wijzigingen:</strong> uitsluitend geldig indien schriftelijk
          vastgelegd en door beide Partijen ondertekend.
        </li>
      </ul>

      <Heading>Ondertekening</Heading>
      <p>
        Voor en namens <strong>Powerdon:</strong> M.K. Okpara, Founder.
        <br />
        Voor en namens{" "}
        <strong>{ph(data.companyName, "Naam van Partij")}:</strong> [naam,
        functie].
      </p>
      <p>
        <strong>Bijlage A</strong> — Specificaties van de schermen (afmetingen,
        resolutie, locaties en technische advertentiespecificaties).
      </p>

      <p className="mt-6 text-xs text-gray-400">Versie: {CONTRACT_VERSION}</p>
    </article>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-6 text-base font-semibold text-black">{children}</h3>;
}

function TierRow({
  title,
  highlighted,
  children,
}: {
  title: string;
  highlighted: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        highlighted
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 bg-transparent"
      }`}
    >
      <strong>{title}</strong>
      <p className="mt-1">{children}</p>
    </div>
  );
}
