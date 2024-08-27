"use client";

import React, { useState, FC } from "react";
import { useRouter } from 'next/navigation';
import { TaxonomyType } from "@/data/types";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import NcModal from "@/components/NcModal/NcModal";
import Button from "@/components/Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export interface ModalCategoriesProps {
  categories: TaxonomyType[];
  selectedCategory: string;
}

const ModalCategories: FC<ModalCategoriesProps> = ({ categories, selectedCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) {
      // If the same category is selected, remove the filter
      router.push('/blogs');
    } else {
      router.push(`/blogs?category=${category}`);
    }
    setIsModalOpen(false);  // Close the modal
  };

  const renderModalContent = () => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => handleCategoryChange(cat.name)}
            className={`cursor-pointer p-2 ${
              cat.name === selectedCategory
                ? 'border-2 border-primary rounded-2xl bg-primary/10'
                : ''
            }`}
          >
            <CardCategory1 taxonomy={cat} size="normal" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalCategories">
      <NcModal
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <div>
              <span className="hidden sm:inline">Explore</span> Categories
              {selectedCategory && `: ${selectedCategory}`}
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other categories"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalCategories;
