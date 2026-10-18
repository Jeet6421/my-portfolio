"use client";

import React, { useState } from "react";
import { profile } from "@/app/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;

const fieldClass =
  "w-full rounded-xl border border-gray-400 bg-white px-4 py-3 outline-none transition focus:border-black dark:border-white/60 dark:bg-darkHover/30 dark:focus:border-accent";

const Contact = () => {
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // Read the form before the first await, because the event is cleared after this handler yields.
    const form = event.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorText(`The contact form isn't set up yet. Email me at ${profile.email} instead.`);
      return;
    }

    setStatus("sending");
    setErrorText("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Contact form error:", data);
        setStatus("error");
        setErrorText(data.message || `Something went wrong. Please try again, or email me at ${profile.email}.`);
      }
    } catch (error) {
      console.error("Contact form network error:", error);
      setStatus("error");
      setErrorText(`Couldn't send your message. Check your connection and try again, or email me at ${profile.email}.`);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section bg-[url('/footer-bg-color.png')] bg-center bg-no-repeat bg-[length:90%_auto] dark:bg-none"
    >
      <SectionHeading
        id="contact-title"
        eyebrow="Connect with me"
        title="Get in touch"
        description="Questions, feedback, or a project you'd like to talk about? Send a message and I'll get back to you."
      />

      <Reveal delay={0.1}>
        <form onSubmit={onSubmit} className="mx-auto max-w-2xl" aria-describedby="contact-status">
          {/* Web3Forms access key. Set NEXT_PUBLIC_ACCESS_KEY in your environment. */}
          <input type="hidden" name="access_key" value={ACCESS_KEY ?? ""} />
          <input type="hidden" name="subject" value="New message from my portfolio" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="What would you like to talk about?"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending" || !ACCESS_KEY}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <p id="contact-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm">
              {!ACCESS_KEY && (
                <span className="text-gray-700 dark:text-white/80">
                  The contact form isn&apos;t set up yet. Email me at {profile.email} instead.
                </span>
              )}
              {ACCESS_KEY && status === "success" && (
                <span className="font-medium text-green-800 dark:text-accent">
                  Thanks! Your message has been sent.
                </span>
              )}
              {ACCESS_KEY && status === "error" && <span className="text-red-700 dark:text-red-300">{errorText}</span>}
            </p>
          </div>
        </form>
      </Reveal>

      <p className="mt-10 text-center text-sm text-gray-700 dark:text-white/80">
        Prefer email?{" "}
        <a href={`mailto:${profile.email}`} className="text-link">
          {profile.email}
        </a>
      </p>
    </section>
  );
};

export default Contact;
