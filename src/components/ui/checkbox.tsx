"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; import {Check} from "lucide-react";
export function Checkbox(props:React.ComponentProps<typeof CheckboxPrimitive.Root>){return <CheckboxPrimitive.Root className="peer h-4 w-4 shrink-0 rounded border border-slate-300 bg-white data-[state=checked]:bg-primary data-[state=checked]:border-primary" {...props}><CheckboxPrimitive.Indicator className="flex items-center justify-center text-white"><Check className="h-3 w-3"/></CheckboxPrimitive.Indicator></CheckboxPrimitive.Root>}
