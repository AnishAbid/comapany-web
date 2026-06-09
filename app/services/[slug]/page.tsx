"use client";

import { useParams } from "next/navigation";
import ServiceDetailLayout from "./service-detail-layout";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  return <ServiceDetailLayout slug={slug} />;
}
