'use client';
import {redirect} from "next/navigation";

export default function Home() {
  redirect('/sign-up');

  return (
    <div>home</div>
  );
}
