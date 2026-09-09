import { CategoryCard } from "./category-card";
import { engagementCategories } from "./constants";

export function CategorySelector() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight">
          Select Engagement Category
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose the type of customer engagement you want to create. Each
          category has its own targeting, trigger and journey configuration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {engagementCategories.map((category) => (
          <CategoryCard key={category.href} {...category} />
        ))}
      </div>
    </div>
  );
}
