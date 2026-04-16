import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Scholarship Index | Opportunities for International Students",
  description: "Browse curated scholarships, research grants, and fully-funded opportunities for students in Rwanda and across Africa.",
};

export default function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
