'use client'

import { Button } from '@/components/ui/button'
import { Category, Flashcard } from '@prisma/client'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Draggable, Droppable } from 'react-beautiful-dnd'

type SubCategory = Category & {
	flashcards: Flashcard[]
	subCategories?: SubCategory[]
}

type Props = {
	category: Category & {
		flashcards: Flashcard[]
		subCategories?: SubCategory[]
	}
	index: number
}

export function DecksList({ category, index }: Props) {
	const dueFlashcards = category.flashcards?.filter(
		(flashcard) => new Date(flashcard.nextReviewDate) <= new Date(),
	)

	const newFlashcards = category.flashcards?.filter(
		(flashcard) => flashcard.repetitions === 0,
	)

	return (
		<Draggable draggableId={category.id} index={index} key={category.id}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className='flex flex-col w-full p-4 space-y-2 border rounded-md border-border bg-background'
				>
					<div className='flex items-center justify-between'>
						<h3 className='font-bold text-md'>{category.name}</h3>
						<div className='flex items-center gap-2'>
							<span className='text-xs text-gray-400'>
								{category.flashcards?.length || 0} cards
							</span>
							<span className='text-xs text-gray-400'>
								{dueFlashcards?.length || 0} due
							</span>
							<span className='text-xs text-gray-400'>
								{newFlashcards?.length || 0} new
							</span>
							<Button size='icon' variant='ghost'>
								<MixerHorizontalIcon className='size-4' />
							</Button>
						</div>
					</div>
					<Droppable droppableId={category.id} type='deckList'>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								aria-busy={snapshot.isDraggingOver}
								className='space-y-4 aria-busy:border-dashed aria-busy:border aria-busy:border-gray-400 aria-busy:rounded-md aria-busy:animate-pulse'
							>
								{category.subCategories?.map((subCategory, index) => (
									<DecksList
										key={subCategory.id}
										category={subCategory}
										index={index}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	)
}
