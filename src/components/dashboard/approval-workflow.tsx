"use client";

import { Check, Mic } from "lucide-react";

const steps = [
  {
    label: "Soumission Audio",
    completed: true,
    date: "Mai 15, 2024 09:15 AM",
    person: "Fatou Ndiaye",
    detail: "Enregistrement Wolof · 12 phrases",
  },
  {
    label: "Revue Communautaire",
    completed: true,
    date: "Mai 15, 2024 02:45 PM",
    person: "3 validateurs",
    detail: "2 approbations / 1 refus",
  },
  {
    label: "Arbitrage Admin",
    completed: false,
    pending: true,
    person: "Mody Barry",
    detail: "Contribution signalée · Score 0.65",
  },
  {
    label: "Validation Finale",
    completed: false,
    pending: false,
    person: "Système",
    detail: "Intégration au corpus",
  },
];

export function ApprovalWorkflow() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-base font-semibold text-gray-800 mb-5">
        Processus de Validation
      </h3>

      {/* Current review item */}
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Mic className="h-4 w-4 text-red-500" />
          <span className="text-sm font-semibold text-red-700">
            CONT-2024-4872
          </span>
        </div>
        <p className="text-xs text-red-600">
          Signalé par 2 validateurs · Qualité audio médiocre
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.label} className="flex gap-3">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed
                    ? "bg-emerald-500"
                    : step.pending
                    ? "border-2 border-red-400 bg-red-50"
                    : "border-2 border-gray-300 bg-white"
                }`}
              >
                {step.completed ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : step.pending ? (
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                ) : null}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-0.5 h-10 ${
                    step.completed ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-5">
              <p
                className={`text-sm font-medium ${
                  step.completed
                    ? "text-gray-800"
                    : step.pending
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                {step.label}
                {step.pending && (
                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-semibold">
                    Action Requise
                  </span>
                )}
              </p>
              {step.completed && (
                <>
                  <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {step.person} · {step.detail}
                  </p>
                </>
              )}
              {!step.completed && !step.pending && (
                <p className="text-xs text-gray-400 mt-0.5">{step.detail}</p>
              )}
              {step.pending && (
                <p className="text-xs text-red-500 mt-0.5">{step.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-2 pt-4 border-t border-gray-100">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
          Rejeter
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
          Approuver
        </button>
      </div>
    </div>
  );
}
