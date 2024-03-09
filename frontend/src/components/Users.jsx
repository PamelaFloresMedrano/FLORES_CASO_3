"use client";
import { useRouter } from "next/navigation";

export default async function Patients({ patients }) {
  const router = useRouter();
  return (
    <ul>
      {patients.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            router.push(`/api/patients/${item.id}`);
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
