"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { PlusIcon, XIcon, CableIcon } from "lucide-react";
import { Button } from "../ui/button";
("use client");

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const frequencies = [
  {
    value: 1,
    label: "week(s)",
  },
  {
    value: 12,
    label: "month(s)",
  },
  {
    value: 52,
    label: "year(s)",
  },
];

function BigTicketItemFreqCombo(props: {
  bigTicketItem: BigTicketItem;
  bigTicketItemInfo: BigTicketItem[];
  setBigTicketItemInfo: React.Dispatch<React.SetStateAction<BigTicketItem[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(52);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frequencies.find((freq) => freq.value === value)?.label
            : "Select frequencies..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search frequencies..." />
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {frequencies.map((freq) => (
                <CommandItem
                  key={freq.value}
                  value={freq.value.toString()}
                  defaultValue={value}
                  onSelect={(currentValue) => {
                    const value = parseInt(currentValue);
                    const newInputs = props.bigTicketItemInfo.map((item) => {
                      if (item.id === props.bigTicketItem.id) {
                        return {
                          ...item,
                          frequencyUnit: value,
                        };
                      }
                      return item;
                    });
                    props.setBigTicketItemInfo(newInputs);
                    setValue(parseInt(currentValue));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === freq.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {freq.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type Debt = {
  id: number;
  name: string;
  amount: number | null;
  interestRate: number | null;
};

type BigTicketItem = {
  id: number;
  name: string;
  amount: number | null;
  frequency: number;
  frequencyUnit: number;
};

function DebtInputRow(props: {
  debt: Debt;
  debtInfo: Debt[];
  setDebtInfo: React.Dispatch<React.SetStateAction<Debt[]>>;
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = props.debtInfo.map((debt) => {
      if (debt.id === props.debt.id) {
        return {
          ...debt,
          name: e.target.value,
        };
      }
      return debt;
    });
    props.setDebtInfo(newInputs);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(parseFloat(e.target.value))
      ? null
      : parseFloat(e.target.value);
    const newInputs = props.debtInfo.map((debt) => {
      if (debt.id === props.debt.id) {
        return {
          ...debt,
          amount: value,
        };
      }
      return debt;
    });
    props.setDebtInfo(newInputs);
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(parseFloat(e.target.value))
      ? null
      : parseFloat(e.target.value);
    const newInputs = props.debtInfo.map((debt) => {
      if (debt.id === props.debt.id) {
        return {
          ...debt,
          interestRate: value,
        };
      }
      return debt;
    });
    props.setDebtInfo(newInputs);
  };

  return (
    <div className="flex place-content-between place-items-end">
      <div className="flex gap-8">
        <div className="max-w-64">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="e.g. HDB mortgage"
            value={props.debt.name}
            onInput={handleNameChange}
          />
        </div>
        <div className="max-w-64">
          <Label>Amount</Label>
          <Input
            type="number"
            step=".01"
            placeholder="e.g. $12,000"
            value={props.debt.amount === null ? "" : props.debt.amount}
            onInput={handleAmountChange}
          />
        </div>
        <div className="max-w-64">
          <Label>Interest Rate</Label>
          <Input
            type="number"
            step=".01"
            placeholder="e.g. 0.03%"
            value={
              props.debt.interestRate === null ? "" : props.debt.interestRate
            }
            onInput={handleInterestRateChange}
          />
        </div>
      </div>
      <Button
        variant="ghost"
        className="flex gap-2 w-fit"
        onClick={() => {
          const newInputs = props.debtInfo.filter(
            (debt) => debt.id !== props.debt.id,
          );
          props.setDebtInfo(newInputs);
        }}
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function BigTicketItemInputRow(props: {
  bigTicketItem: BigTicketItem;
  bigTicketItemInfo: BigTicketItem[];
  setBigTicketItemInfo: React.Dispatch<React.SetStateAction<BigTicketItem[]>>;
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = props.bigTicketItemInfo.map((debt) => {
      if (debt.id === props.bigTicketItem.id) {
        return {
          ...debt,
          name: e.target.value,
        };
      }
      return debt;
    });
    props.setBigTicketItemInfo(newInputs);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(parseFloat(e.target.value))
      ? null
      : parseFloat(e.target.value);
    const newInputs = props.bigTicketItemInfo.map((debt) => {
      if (debt.id === props.bigTicketItem.id) {
        return {
          ...debt,
          amount: value,
        };
      }
      return debt;
    });
    props.setBigTicketItemInfo(newInputs);
  };

  const handleFreqValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newInputs = props.bigTicketItemInfo.map((debt) => {
      if (debt.id === props.bigTicketItem.id) {
        return {
          ...debt,
          frequency: value,
        };
      }
      return debt;
    });
    props.setBigTicketItemInfo(newInputs);
  };

  return (
    <div className="flex place-content-between place-items-end">
      <div className="flex gap-8">
        <div className="max-w-64">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="e.g. Travel to Japan"
            value={props.bigTicketItem.name}
            onInput={handleNameChange}
          />
        </div>
        <div className="max-w-64">
          <Label>Amount</Label>
          <Input
            type="number"
            step=".01"
            placeholder="e.g. $2,500"
            value={
              props.bigTicketItem.amount === null
                ? ""
                : props.bigTicketItem.amount
            }
            onInput={handleAmountChange}
          />
        </div>
        <div className="max-w-64">
          <Label>On average every</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={props.bigTicketItem.frequency}
              onInput={handleFreqValueChange}
              className="w-16"
            />
            <BigTicketItemFreqCombo
              bigTicketItem={props.bigTicketItem}
              bigTicketItemInfo={props.bigTicketItemInfo}
              setBigTicketItemInfo={props.setBigTicketItemInfo}
            />
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="flex gap-2 w-fit"
        onClick={() => {
          const newInputs = props.bigTicketItemInfo.filter(
            (bigTicketItem) => bigTicketItem.id !== props.bigTicketItem.id,
          );
          props.setBigTicketItemInfo(newInputs);
        }}
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Profile() {
  const [isWorking, setIsWorking] = useState(false);
  const [debtInfo, setDebtInfo] = useState<Debt[]>([
    { id: 0, name: "", amount: null, interestRate: null },
  ]);
  const [highestDebtRowCount, setHighestDebtRowCount] = useState(0);
  const [bigTicketItemInfo, setBigTicketItemInfo] = useState<BigTicketItem[]>([
    { id: 0, name: "", amount: null, frequency: 1, frequencyUnit: 52},
  ]);
  const [highestBigTicketItemRowCount, setHighestBigTicketItemRowCount] =
    useState(0);

  return (
    <div className="w-full bg-neutral-100 p-8 flex flex-col overflow-auto">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          Profile
        </h1>
        <span className="text-neutral-500">Update your profile</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="max-w-64">
          <Label>What is your age?</Label>
          <Input type="number" placeholder="e.g. 21" />
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
              <Input type="number" defaultValue={0} step=".01" />
            </div>
            <div className="max-w-64">
              <Label>Stock</Label>
              <Input type="number" defaultValue={0} step=".01" />
            </div>
            <div className="max-w-64">
              <Label>Bond</Label>
              <Input type="number" defaultValue={0} step=".01" />
            </div>
            <div className="max-w-64">
              <Label>Other</Label>
              <Input type="number" defaultValue={0} step=".01" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-neutral-200 rounded-lg p-4 bg-white">
          What debts do you currently have?
          {debtInfo.map((debt) => (
            <DebtInputRow
              key={debt.id}
              debt={debt}
              debtInfo={debtInfo}
              setDebtInfo={setDebtInfo}
            />
          ))}
          <Button
            variant="outline"
            className="flex gap-2 w-fit"
            onClick={() => {
              setDebtInfo([
                ...debtInfo,
                {
                  id: highestDebtRowCount + 1,
                  name: "",
                  amount: null,
                  interestRate: null,
                },
              ]);
              setHighestDebtRowCount(highestDebtRowCount + 1);
            }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add new item</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 border border-neutral-200 rounded-lg p-4 bg-white">
          Currently, what are your expenses?
          <Dialog>
            <DialogTrigger className="max-w-64">
              <Button variant="outline" className="flex gap-2">
                <CableIcon className="h-4 w-4" />
                <span>Connect Bank Accounts</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>This has not been implemented yet</DialogTitle>
                <DialogDescription>
                  In the future, expense data (where available) will be pulled
                  from external bank API, such as{" "}
                  <a
                    href="https://www.dbs.com/dbsdevelopers/discover/index.html"
                    className="underline text-blue-500"
                  >
                    DBS
                  </a>
                  .
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          Do you regularly spend on any big ticket items? (e.g. travel, house renovations)
          {bigTicketItemInfo.map((item) => (
            <BigTicketItemInputRow
              key={item.id}
              bigTicketItem={item}
              bigTicketItemInfo={bigTicketItemInfo}
              setBigTicketItemInfo={setBigTicketItemInfo}
            />
          ))}
          <Button
            variant="outline"
            className="flex gap-2 w-fit"
            onClick={() => {
              setBigTicketItemInfo([
                ...bigTicketItemInfo,
                {
                  id: highestBigTicketItemRowCount + 1,
                  name: "",
                  amount: null,
                  frequency: 1,
                  frequencyUnit: 52,
                },
              ]);
              setHighestBigTicketItemRowCount(highestBigTicketItemRowCount + 1);
            }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add new item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
