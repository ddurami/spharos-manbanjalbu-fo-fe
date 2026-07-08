import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SignupTermDetail } from "@/components/auth/SignupTermDetail";
import {
  getSignupTermConfig,
  isValidSignupTermSlug,
} from "@/constants/signup-terms";

type SignupTermDetailPageProps = {
  params: Promise<{ termKey: string }>;
};

export async function generateMetadata({
  params,
}: SignupTermDetailPageProps): Promise<Metadata> {
  const { termKey } = await params;
  const config = getSignupTermConfig(termKey);

  return {
    title: config ? `${config.title} | 스타벅스` : "약관 상세 | 스타벅스",
  };
}

function readTermContent(contentFile: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/signup-terms",
    contentFile,
  );

  return readFileSync(filePath, "utf8");
}

export default async function SignupTermDetailPage({
  params,
}: SignupTermDetailPageProps) {
  const { termKey } = await params;

  if (!isValidSignupTermSlug(termKey)) {
    notFound();
  }

  const config = getSignupTermConfig(termKey);

  if (!config) {
    notFound();
  }

  const content = config.contentFile
    ? readTermContent(config.contentFile)
    : null;

  return <SignupTermDetail config={config} content={content} />;
}
