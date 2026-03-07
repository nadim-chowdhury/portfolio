"use client";

import Link from "next/link";

export default function NavMenu({ data }: any) {
  return <Link href={data.route}>{data.label}</Link>;
}
