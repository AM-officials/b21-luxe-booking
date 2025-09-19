"use client";
import { useState } from 'react';
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Category { name: string; items: { label: string; price: string }[] }

const maleCategories: Category[] = [
	{ name: 'Haircut & Finish', items: [
		{ label: 'Classic Haircut', price: '₹600' },
		{ label: 'Skin Fade', price: '₹750' },
		{ label: 'Beard Trim + Shape', price: '₹450' },
	]},
	{ name: 'Color', items: [
		{ label: 'Grey Coverage', price: '₹1,200' },
		{ label: 'Highlights (Partial)', price: '₹1,800' },
	]},
	{ name: 'Treatments', items: [
		{ label: 'Scalp Detox', price: '₹900' },
		{ label: 'Keratin Express', price: '₹2,500' },
	]},
];

const femaleCategories: Category[] = [
	{ name: 'Haircut & Finish', items: [
		{ label: 'Signature Cut + Blow Dry', price: '₹1,400' },
		{ label: 'Fringe Trim', price: '₹300' },
	]},
	{ name: 'Color', items: [
		{ label: 'Global Color', price: '₹2,200' },
		{ label: 'Balayage', price: '₹4,800' },
		{ label: 'Root Touch-Up', price: '₹1,600' },
	]},
	{ name: 'Treatments', items: [
		{ label: 'Olaplex Repair', price: '₹1,900' },
		{ label: 'Keratin Smoothing', price: '₹6,500' },
	]},
];

export default function ServicesPage() {
	const [expanded, setExpanded] = useState<'male' | 'female' | null>(null);
	const toggle = (panel: 'male' | 'female') => setExpanded(p => p === panel ? null : panel);

	return (
		<>
			<Header />
			<main className="pt-24 pb-32">
				<section className="max-w-7xl mx-auto px-6">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Our Services & Pricing</h1>
					<div className="grid md:grid-cols-2 gap-10 relative">
						<GenderCard
							gender="male"
							title="Male"
							image="/men-pricing.png"
							categories={maleCategories}
							expanded={expanded==='male'}
							onToggle={() => toggle('male')}
							accent="from-blue-500/10 to-blue-500/0"
						/>
						<GenderCard
							gender="female"
							title="Female"
							image="/women-pricing.png"
							categories={femaleCategories}
							expanded={expanded==='female'}
							onToggle={() => toggle('female')}
							accent="from-pink-500/10 to-pink-500/0"
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

interface GenderCardProps {
	gender: 'male' | 'female';
	title: string;
	image: string;
	categories: Category[];
	expanded: boolean;
	onToggle: () => void;
	accent: string;
}

function GenderCard({ title, image, categories, expanded, onToggle, accent }: GenderCardProps) {
	return (
		<motion.div
			layout
			onClick={onToggle}
			className={`group relative cursor-pointer rounded-3xl bg-gradient-to-b ${accent} border border-black/5 shadow-sm overflow-hidden flex flex-col`}
			animate={{ boxShadow: expanded ? '0 12px 40px -8px rgba(0,0,0,0.25)' : '0 4px 16px -4px rgba(0,0,0,0.08)' }}
			transition={{ type: 'spring', stiffness: 120, damping: 18 }}
		>
			<motion.div layout className="relative">
				<div className="absolute -top-24 left-1/2 -translate-x-1/2 w-60 h-60 pointer-events-none select-none">
					<Image src={image} alt={title} fill style={{ objectFit:'contain' }} />
				</div>
				<div className="pt-44 pb-10 text-center">
					<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
					<p className="mt-2 text-sm text-neutral-600">Tap to {expanded? 'collapse':'view pricing'}</p>
				</div>
			</motion.div>
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="content"
						initial={{ opacity:0, y:-12 }}
						animate={{ opacity:1, y:0 }}
						exit={{ opacity:0, y:-12 }}
						transition={{ duration:0.35 }}
						className="px-6 pb-10"
					>
						<div className="space-y-8">
							{categories.map(cat => (
								<div key={cat.name} className="border-b last:border-b-0 pb-6 last:pb-0">
									<h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-500 mb-3">{cat.name}</h3>
									<ul className="space-y-2">
										{cat.items.map(it => (
											<li key={it.label} className="flex justify-between text-sm">
												<span>{it.label}</span>
												<span className="font-medium tabular-nums">{it.price}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
