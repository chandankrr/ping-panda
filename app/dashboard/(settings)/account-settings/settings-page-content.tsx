"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/server/client";

export const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string;
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId);

  const { mutate, isPending } = trpc.project.setDiscordId.useMutation({
    onSuccess: () => {
      console.log("Discord ID updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update Discord ID:", error);
    },
  });

  const handleSubmit = () => {
    mutate({ discordId });
  };

  return (
    <Card className="max-w-xl w-full space-y-4">
      <div className="pt-2">
        <Label>Discord ID</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>

      <p className="mt-2 text-sm/6 text-gray-600">
        Don&apos;t know how to find your discord ID?{" "}
        <Link href="#" className="text-brand-600 hover:text-brand-500">
          Learn how to obtain it here
        </Link>
        .
      </p>

      <div className="pt-4">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
};
