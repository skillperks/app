import { AutoBreadcrumbJsonLd } from "@/components/seo/auto-breadcrumb-jsonld";
import { CommentsPlaceholder } from "@/components/shared/comments-placeholder";

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoBreadcrumbJsonLd />
      {children}
      <div className="container px-4 pb-10 md:px-6 md:pb-16 mx-auto">
        <div className="max-w-3xl">
          <CommentsPlaceholder />
        </div>
      </div>
    </>
  );
}
