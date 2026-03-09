"use client";

import { Check, X, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  name: string;
  description?: string;
}

interface Platform {
  name: string;
  rating: number;
  price: string;
  bestFor: string;
  features: (boolean | null)[];
  couponAvailable?: boolean;
  couponDiscount?: string;
}

interface ComparisonTableProps {
  platforms: Platform[];
  features: Feature[];
}

export function ComparisonTable({ platforms, features }: ComparisonTableProps) {
  const renderFeatureValue = (value: boolean | null) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    if (value === false) {
      return <X className="h-5 w-5 text-red-500" />;
    }
    return <Minus className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="text-left p-4 font-semibold">Feature</th>
              {platforms.map((platform) => (
                <th key={platform.name} className="text-center p-4 min-w-[180px]">
                  <div className="space-y-2">
                    <div className="font-bold text-lg">{platform.name}</div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{platform.rating}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-500">{platform.price}</div>
                    {platform.couponAvailable && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/30">
                        {platform.couponDiscount} OFF
                      </Badge>
                    )}
                    <div className="text-sm text-muted-foreground">{platform.bestFor}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature.name} className="border-t border-border">
                <td className="p-4">
                  <div className="font-medium">{feature.name}</div>
                  {feature.description && (
                    <div className="text-sm text-muted-foreground mt-1">{feature.description}</div>
                  )}
                </td>
                {platforms.map((platform) => (
                  <td key={`${platform.name}-${index}`} className="text-center p-4">
                    {renderFeatureValue(platform.features[index])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
