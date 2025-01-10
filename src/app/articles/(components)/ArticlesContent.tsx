"use client";

import useSWR from "swr/immutable";
import { Site } from "@/app/api/articles/route";
import { FormattedDate } from "@/components/FormattedDate";
import { Article } from "@/types/articles";
import clsx from "clsx";
import Link from "next/link";

const fetchArticles = async () => {
	try {
		const { NEXT_PUBLIC_BASE_URL = "" } = process.env;
		const url = new URL("/api/articles", NEXT_PUBLIC_BASE_URL).toString();
		const response = await fetch(url, { next: { revalidate: 3600 } });
		return (await response.json()) as Record<Site, Article[]>;
	} catch (error) {
		console.error(error);
		return {} as Record<Site, Article[]>;
	}
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ArticlesContent = () => {
	const { data, error } = useSWR<Record<Site, Article[]>>("/api/articles", fetcher);

	if (error) {
		return <p>記事の取得に失敗しました</p>;
	}
	if (!data) {
		return <p>記事を取得中...</p>;
	}

	return (
		<ul className="list">
			{Object.entries(data).map(([site, articles]) => (
				<li key={site}>
					<h2>{site}</h2>
					<ul>
						{articles.map((article) => (
							<li key={article.url}>
								<p>
									<FormattedDate date={article.created} />-{" "}
									<Link
										href={article.url}
										target="_blank"
										className={clsx("hover:underline", "text-blue-500")}
									>
										{article.title}
									</Link>
								</p>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};
