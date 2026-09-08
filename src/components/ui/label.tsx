import type React from "react";
export function Label({children,className="",...props}:React.ComponentProps<"label">){return <label className={`text-sm font-medium ${className}`} {...props}>{children}</label>}
