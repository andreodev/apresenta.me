import EditCurriculumPage from "@/modules/curriculums/pages/edit-curriculum-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <EditCurriculumPage curriculumId={id} />;
}
