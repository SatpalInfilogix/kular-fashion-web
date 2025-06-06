'use client';

import { useState } from 'react';
import { MdFilterAlt } from "react-icons/md";
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Filter {
    product_types: { id: string; name: string }[];
    sizes: { id: string; name: string }[];
    colors: { id: string; color_code: string }[];
    price: { min: number; max: number };
}

interface SelectedFilters {
    product_types: string[];
    sizes: string[];
    colors: string[];
    price: { min: number; max: number };
}

interface FilterSidebarProps {
    filters: Filter;
    selectedFilters: SelectedFilters;
    onFilterChange: (type: keyof SelectedFilters, value: any) => void;
    onResetFilters: () => void;
}

export default function FilterSidebar({ filters, selectedFilters, onFilterChange, onResetFilters }: FilterSidebarProps) {
    const [filterOpen, setFilterOpen] = useState({
        product_types: true,
        sizes: true,
        colors: true,
        price: true,
    });

    const toggleFilter = (filter: keyof typeof filterOpen) => {
        setFilterOpen((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };

    const toggleSelection = <T,>(selected: T[], value: T) => {
        return selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    };

    const shouldShowFilterSection = (filter: keyof typeof filters) => {
        switch (filter) {
            case 'product_types':
                return filters.product_types.length > 0;
            case 'sizes':
                return filters.sizes.length > 0;
            case 'colors':
                return filters.colors.length > 0;
            case 'price':
                return filters.price.min !== filters.price.max;
            default:
                return false;
        }
    };

    return (
        <>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={'sm'} className='rounded-none ml-auto'>
                            <MdFilterAlt /> Apply Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>Apply your filter preferences</SheetDescription>
                        </SheetHeader>
                        <div className="px-3">
                            {['product_types', 'sizes', 'colors', 'price'].map((filter) => (
                                shouldShowFilterSection(filter as keyof typeof filters) && (
                                    <div key={filter} className="mb-4">
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter(filter as keyof typeof filterOpen)}>
                                            <h3 className="text-md font-medium capitalize">{filter}</h3>
                                            <span>{filterOpen[filter as keyof typeof filterOpen] ? <SlArrowUp /> : <SlArrowDown />}</span>
                                        </div>
                                        <AnimatePresence>
                                            {filter === 'product_types' && filterOpen.product_types && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {filters.product_types.map((category) => (
                                                        <div key={`category-m-${category.id}`} className="flex items-center space-x-2 mt-2">
                                                            <Checkbox id={`category-m-${category.id}`} checked={selectedFilters.product_types.includes(category.id)} onCheckedChange={() => onFilterChange('product_types', toggleSelection(selectedFilters.product_types, category.id))} />
                                                            <label htmlFor={`category-m-${category.id}`} className="text-sm cursor-pointer">{category.name}</label>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                            {filter === 'sizes' && filterOpen.sizes && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {filters.sizes.map((size) => (
                                                        <div key={`size-m-${size.id}`} className="flex items-center space-x-2 mt-2">
                                                            <Checkbox id={`size-m-${size.id}`} checked={selectedFilters.sizes.includes(size.id)} onCheckedChange={() => onFilterChange('sizes', toggleSelection(selectedFilters.sizes, size.id))} />
                                                            <label htmlFor={`size-m-${size.id}`} className="text-sm cursor-pointer">{size.name}</label>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                            {filter === 'colors' && filterOpen.colors && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {filters.colors.map((color) => (
                                                            <button key={`color-m-${color.id}`} className={`w-6 h-6 rounded-full border ${selectedFilters.colors.includes(color.id) ? 'ring-2 ring-black' : ''}`} style={{ backgroundColor: color.color_code }} onClick={() => onFilterChange('colors', toggleSelection(selectedFilters.colors, color.id))} />
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                            {filter === 'price' && filterOpen.price && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="mt-2">
                                                        <Slider min={filters.price.min} max={filters.price.max} step={1} value={[selectedFilters.price.min, selectedFilters.price.max > -1 ? selectedFilters.price.max : filters.price.max]} onValueChange={(val) => onFilterChange('price', { min: val[0], max: val[1] })} />
                                                        <div className="flex justify-between">
                                                            <span>£{selectedFilters.price.min}</span>
                                                            <span>£{selectedFilters.price.max > -1 ? selectedFilters.price.max : filters.price.max}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:block rounded-lg shadow-lg bg-white p-4">
                {['product_types', 'sizes', 'colors', 'price'].map((filter) => (
                    shouldShowFilterSection(filter as keyof typeof filters) && (
                        <div key={filter} className="mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter(filter as keyof typeof filterOpen)}>
                                <h3 className="text-md font-medium capitalize">{filter === 'product_types' ? `Product Types` : filter}</h3>
                                <span>{filterOpen[filter as keyof typeof filterOpen] ? <SlArrowUp /> : <SlArrowDown />}</span>
                            </div>
                            <AnimatePresence>
                                {filter === 'product_types' && filterOpen.product_types && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {filters.product_types.map((category) => (
                                            <div key={`category-d-${category.id}`} className="flex items-center space-x-2 mt-2">
                                                <Checkbox id={`category-d-${category.id}`} checked={selectedFilters.product_types.includes(category.id)} onCheckedChange={() => onFilterChange('product_types', toggleSelection(selectedFilters.product_types, category.id))} />
                                                <label htmlFor={`category-d-${category.id}`} className="text-sm cursor-pointer">{category.name}</label>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                                {filter === 'sizes' && filterOpen.sizes && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {filters.sizes.map((size) => (
                                            <div key={`size-d-${size.id}`} className="flex items-center space-x-2 mt-2">
                                                <Checkbox id={`size-d-${size.id}`} checked={selectedFilters.sizes.includes(size.id)} onCheckedChange={() => onFilterChange('sizes', toggleSelection(selectedFilters.sizes, size.id))} />
                                                <label htmlFor={`size-d-${size.id}`} className="text-sm cursor-pointer">{size.name}</label>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                                {filter === 'colors' && filterOpen.colors && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {filters.colors.map((color) => (
                                                <button key={`color-d-${color.id}`} className={`w-6 h-6 rounded-full border ${selectedFilters.colors.includes(color.id) ? 'ring-2 ring-black' : ''}`} style={{ backgroundColor: color.color_code }} onClick={() => onFilterChange('colors', toggleSelection(selectedFilters.colors, color.id))} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {filter === 'price' && filterOpen.price && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mt-2">
                                            <Slider min={filters.price.min} max={filters.price.max} step={1} value={[selectedFilters.price.min, selectedFilters.price.max > -1 ? selectedFilters.price.max : filters.price.max]} onValueChange={(val) => onFilterChange('price', { min: val[0], max: val[1] })} />
                                            <div className="flex justify-between">
                                                <span>£{selectedFilters.price.min}</span>
                                                <span>£{selectedFilters.price.max > -1 ? selectedFilters.price.max : filters.price.max}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                ))}
            </div>
        </>
    );
}