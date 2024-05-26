"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

type Debt = {
  name: string;
  amount: number;
  interestRate: number;
}

function DebtInputRow() {
  return (
    <div className="flex gap-8">
      <div className="max-w-64">
        <Label>Name</Label>
        <Input type="text" />
      </div>
      <div className="max-w-64">
        <Label>Amount</Label>
        <Input type="number" defaultValue={0} />
      </div>
      <div className="max-w-64">
        <Label>Interest Rate</Label>
        <Input type="number" defaultValue={0} />
      </div>
    </div>
  );
}

function Profile() {
  const [isWorking, setIsWorking] = useState(false);
  const [debtInfo, setDebtInfo] = useState<Debt[]>([{ name: "", amount: 0, interestRate: 0 }]);

  return (
    <div className="w-full bg-neutral-100 p-8 flex flex-col">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          Profile
        </h1>
        <span className="text-neutral-500">Update your profile</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="max-w-64">
          <Label>What is your age?</Label>
          <Input type="number" />
        </div>
        <div className="flex max-w-64 place-items-center gap-2">
          <Label>I am currently working</Label>
          <Checkbox
            checked={isWorking}
            onCheckedChange={() => setIsWorking(!isWorking)}
          />
        </div>
        {isWorking && (
          <div className="flex flex-col gap-2 border border-neutral-200 rounded-lg p-4 bg-white">
            <div className="flex gap-8">
              <div className="max-w-64">
                <Label>What industry are you working in?</Label>
                <Input type="text" />
              </div>
              <div className="max-w-64">
                <Label>What is your current income?</Label>
                <Input type="number" />
              </div>
            </div>
            <span className="text-sm">Your predicted income growth is</span>
          </div>
        )}
        <div className="flex flex-col gap-2 border border-neutral-200 rounded-lg p-4 bg-white">
          What assets do you currently own?
          <div className="flex gap-8">
            <div className="max-w-64">
              <Label>Cash</Label>
              <Input type="number" defaultValue={0} />
            </div>
            <div className="max-w-64">
              <Label>Stock</Label>
              <Input type="number" defaultValue={0} />
            </div>
            <div className="max-w-64">
              <Label>Bond</Label>
              <Input type="number" defaultValue={0} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border border-neutral-200 rounded-lg p-4 bg-white">
          What debts do you currently have?
          {debtInfo.map((debt, index) => <DebtInputRow key={index} />)}
        </div>
        {}
      </div>
    </div>
  );
}

export default Profile;
