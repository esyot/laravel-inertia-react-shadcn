import { ReactNode } from "react";

interface ContentProps {
    children: ReactNode;
}

export default function Header({ children }: ContentProps) {
    return <main>{children}</main>;
}
