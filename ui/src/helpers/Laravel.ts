import type { FullLaravelPaginationMeta, MinimalLaravelPaginationMeta } from '@/interfaces/Laravel'

export function makeMinimalLaravelPaginationMeta(
	meta?: Partial<FullLaravelPaginationMeta>,
): MinimalLaravelPaginationMeta {
	return {
		current_page: meta?.current_page ?? 1,
		from: meta?.from ?? 1,
		last_page: meta?.last_page ?? 1,
		per_page: meta?.per_page ?? 0,
		to: meta?.to ?? 0,
		total: meta?.total ?? 0,
	}
}
