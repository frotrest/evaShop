import allBlog from './AllBlogPages.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import fetchBlog from '../../store/async/blogDataThunk';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import placeholderImg from '@assets/placeholder.webp';
import Container from '../../Components/Container';
import { blogDataFetchState } from '../../store/selectors';
import { IoArrowForward, IoTimeOutline } from 'react-icons/io5';

export default function AllBlogPages() {
  const dispatch = useDispatch();
  const { blogDataFetch } = useSelector(blogDataFetchState);

  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={clsx(allBlog.pageWrapper)}>
      <Container>
        <div className={clsx(allBlog.headerSection)}>
          <span className={clsx(allBlog.eyebrow)}>THE ATELIER JOURNAL</span>
          <h1 className={clsx(allBlog.mainTitle)}>Curated Stories & Essays</h1>
          <p className={clsx(allBlog.subTitle)}>
            Insights into architectural tailoring, modern silhouettes, runway reports, and timeless
            wardrobe investments.
          </p>
        </div>

        <div className={clsx(allBlog.blogGrid)}>
          {blogDataFetch.map((e) => (
            <Link
              to={{
                pathname: '/blogPage',
                search: `?name=${e.type}`,
              }}
              key={e.id}
              className={clsx(allBlog.articleCard)}
            >
              <div className={clsx(allBlog.photoWrap)}>
                <img
                  className={clsx(allBlog.photo)}
                  src={imageErrors[e.id] ? placeholderImg : e.imageUrl}
                  alt={e.title}
                  onError={() => handleImageError(e.id)}
                  loading="lazy"
                />
                <span className={clsx(allBlog.articleTag)}>{e.type || 'Editorial'}</span>
              </div>

              <div className={clsx(allBlog.articleContent)}>
                <div className={clsx(allBlog.metaRow)}>
                  <span className={clsx(allBlog.readTime)}>
                    <IoTimeOutline size={13} />
                    <span>4 min read</span>
                  </span>
                </div>

                <h3 className={clsx(allBlog.titleItem)}>{e.title}</h3>
                <p className={clsx(allBlog.description)}>
                  {e.firstDescription
                    ? `${e.firstDescription.slice(0, 140)}...`
                    : 'Read full atelier dispatch and styling insights.'}
                </p>

                <div className={clsx(allBlog.readMoreLink)}>
                  <span>Read Essay</span>
                  <IoArrowForward size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
