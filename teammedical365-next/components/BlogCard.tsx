import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  location: string;
  readTime: string;
  icon: string;
  slug: string;
  color: string;
}

export default function BlogCard({ title, excerpt, category, location, readTime, icon, slug, color }: BlogCardProps) {
  return (
    <article className="post-card">
      <Link href={`/${slug}`} className="card-inner">
        <div className="card-top" style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)` }}>
          <span className="card-icon">{icon}</span>
          <div className="card-meta-top">
            <span className="cat-pill" style={{ background: `${color}15`, color: color }}>{category}</span>
            <span className="read-time">{readTime}</span>
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="card-excerpt">{excerpt}</p>
          <div className="card-footer">
            <span className="loc-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {location}
            </span>
            <span className="read-link" style={{ color: color }}>
              Read more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="card-accent" style={{ background: color }}></div>
      </Link>
    </article>
  );
}
