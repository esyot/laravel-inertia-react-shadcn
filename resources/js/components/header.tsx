import { ReactNode } from "react";

interface HeaderProps {
    children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
    return <main>{children}</main>;
}
