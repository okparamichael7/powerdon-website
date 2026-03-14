"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form as FormContainer,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import SuccessMessage from "@/components/success-message";
import ErrorMessage from "@/components/error-message";
import { createContactSchema, contactSchema } from "@/schema";
import { contact, ContactFormData } from "@/app/actions/contact";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackFormSubmit, trackConversion } from "@/lib/analytics";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null,
  );
  const { locale, namespace } = useTranslation();
  const forms = namespace("forms");
  const schema = createContactSchema(forms.validation);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ContactFormData) => {
    startTransition(() => {
      contact(values, locale)
        .then((data) => {
          if (data.success) {
            setFormStatus("success");
            trackFormSubmit("contact_form");
            trackConversion("contact_form_submission");

            // Clear form
            form.reset();
          } else if (data.error) {
            setFormStatus("error");
          }
        })
        .catch((err) => {
          setFormStatus("error");
        });
    });
  };

  const onError = () => {
    setFormStatus("error");
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-black text-2xl">
          {forms.contact.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName" className="text-black">
                      {forms.contact.fields.firstName}
                    </Label>
                    <FormControl>
                      <Input
                        id="firstName"
                        className="bg-white border-gray-300 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="lastName" className="text-black">
                      {forms.contact.fields.lastName}
                    </Label>
                    <FormControl>
                      <Input
                        id="lastName"
                        className="bg-white border-gray-300 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-black">
                      {forms.contact.fields.email}
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        className="bg-white border-gray-300 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="phone" className="text-black">
                      {forms.contact.fields.phone}
                    </Label>
                    <FormControl>
                      <Input
                        id="phone"
                        className="bg-white border-gray-300 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="company" className="text-black">
                    {forms.contact.fields.company}
                  </Label>
                  <FormControl>
                    <Input
                      id="company"
                      className="bg-white border-gray-300 text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="subject" className="text-black mb-1">
                    {forms.contact.fields.subject}
                  </Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border-gray-300 text-black placeholder:text-gray-600">
                        <SelectValue
                          placeholder={forms.contact.subjectPlaceholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">
                        {forms.contact.subjects.general}
                      </SelectItem>
                      <SelectItem value="sales">
                        {forms.contact.subjects.sales}
                      </SelectItem>
                      <SelectItem value="support">
                        {forms.contact.subjects.support}
                      </SelectItem>
                      <SelectItem value="partnership">
                        {forms.contact.subjects.partnership}
                      </SelectItem>
                      <SelectItem value="media">
                        {forms.contact.subjects.media}
                      </SelectItem>
                      <SelectItem value="other">
                        {forms.contact.subjects.other}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="message" className="text-black">
                    {forms.contact.fields.message}
                  </Label>
                  <FormControl>
                    <Textarea
                      id="message"
                      className="bg-white border-gray-300 text-black placeholder:text-gray-600 min-h-[120px]"
                      placeholder={forms.contact.messagePlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-lg py-3"
              disabled={isPending}
            >
              {isPending ? forms.contact.submitting : forms.contact.submit}
            </Button>
            <p className="text-gray-600 text-sm text-center">
              {forms.contact.helper}
            </p>
            {formStatus === "success" && (
              <SuccessMessage message={forms.feedback.success} />
            )}
            {formStatus === "error" && (
              <ErrorMessage message={forms.feedback.error} />
            )}
          </form>
        </FormContainer>
      </CardContent>
    </Card>
  );
}
