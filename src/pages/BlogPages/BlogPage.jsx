import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import fetchBlog from '../../store/async/blogDataThunk';
import { filterInfo } from '../../store/slices/blogSlice';
import blog from './BlogPages.module.css';
import Container from '../../Components/Container';
import placeholderImg from '@assets/placeholder.webp';
import { blogDataFetchState } from '../../store/selectors';

export default function BlogPages({ clouses = 'dress' }) {
  const [blogSearch, setBlogSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { blogDataFetch, filterBlogResult } = useSelector(blogDataFetchState);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);
  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlogSearch(nameParam);
    } else {
      setSearchParams({ name: clouses }, { replace: true });
      setBlogSearch(clouses);
    }
  }, [searchParams, clouses, setSearchParams]);

  useEffect(() => {
    if (blogDataFetch.length && blogSearch) {
      dispatch(filterInfo(blogSearch));
    }
  }, [blogSearch, blogDataFetch, dispatch]);

  const handleImageError = (e) => {
    e.target.src = placeholderImg;
  };

  const currentBlog = filterBlogResult?.[0];
  const imageSrc = currentBlog?.imageUrl || placeholderImg;

  return (
    <>
      {currentBlog && (
        <section className={clsx(blog.blogSection)}>
          <Container className={clsx(blog.blogContent)}>
            <div className={clsx(blog.contentTitle)}>
              <h1 className={clsx(blog.title)}>{currentBlog.title}</h1>
              <p className={clsx(blog.description)}>{currentBlog.firstDescription}</p>
            </div>
            <img
              src={imageSrc}
              alt={currentBlog.title || 'Blog image'}
              onError={handleImageError}
              loading="lazy"
            />
          </Container>
        </section>
      )}
    </>
  );
}
