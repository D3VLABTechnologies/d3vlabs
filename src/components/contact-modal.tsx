"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if EmailJS is configured
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      // Fallback: Show success message and copy contact info
      toast.success(
        "Thank you for your message! Please contact us directly at info@d3vlabs.com"
      );
      console.log("Contact form data:", formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      onClose();
      return;
    }

    // Log configuration for debugging (remove in production)
    console.log("EmailJS Config:", {
      hasPublicKey: !!publicKey,
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      serviceId: serviceId,
    });

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current!,
        publicKey
      );

      if (result.text === "OK") {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        onClose();
      }
    } catch (error: any) {
      console.error("Email error:", error.text || error);

      // Handle specific Zoho access restriction error
      if (error.text && error.text.includes("Access Restricted")) {
        toast.error(
          "Email service temporarily unavailable. Please contact us directly at info@d3vlabs.com"
        );
      } else {
        toast.error(
          "Failed to send message. Please try again or contact us directly at info@d3vlabs.com"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4 text-center">
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg transform overflow-hidden rounded-xl
                          bg-[#1a1b26]/95 border border-white/10 shadow-xl 
                          backdrop-blur-sm transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Contact Us</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Or reach us directly at{" "}
                        <a
                          href="mailto:info@d3vlabs.com"
                          className="text-[#eac01a] hover:underline"
                        >
                          info@d3vlabs.com
                        </a>
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Form */}
                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 block text-left">
                        Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 
                                 rounded-lg focus:outline-none focus:border-[#eac01a] 
                                 transition-colors text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 block text-left">
                        Email
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 
                                 rounded-lg focus:outline-none focus:border-[#eac01a] 
                                 transition-colors text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 block text-left">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 
                                 rounded-lg focus:outline-none focus:border-[#eac01a] 
                                 transition-colors text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 block text-left">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 
                                 rounded-lg focus:outline-none focus:border-[#eac01a] 
                                 transition-colors resize-none text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#eac01a] hover:bg-[#eac01a]/90 text-black font-medium
                               px-4 py-3 rounded-lg transition-all duration-300
                               hover:shadow-[0_0_20px_rgba(234,192,26,0.3)]
                               disabled:opacity-50 disabled:cursor-not-allowed
                               mt-4"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Send Message</span>
                          <Send size={16} />
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
