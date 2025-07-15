"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, X, Headphones } from "lucide-react";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = () => {
    window.open("tel:+919810190005", "_self");
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919810190005?text=Hi, I need help with finding a tutor",
      "_blank"
    );
  };

  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={handleWhatsApp}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 text-white"
          size="sm"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Call Button - Right Side */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleCall}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-2xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 text-white"
          size="sm"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>

      {/* Optional Help Card (can be triggered by either button) */}
      {isOpen && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
          <Card className="w-64 shadow-2xl border-emerald-200 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-emerald-600" />
                  Need Help?
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Choose your preferred way to contact us
              </p>
              <div className="space-y-2">
                <Button
                  onClick={handleCall}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
