import allBlog from './AllBlogPages.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import fetchBlog from '../../store/async/blogDataThunk';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import placeholderImg from '@assets/placeholder.webp';
import Container from '../../Components/Container';
import { blogDataFetchState } from '../../store/selectors';

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
    <Container className={clsx(allBlog.containerPage)}>
      {blogDataFetch.map((e) => (
        <Link
          to={{
            pathname: '/blogPage',
            search: `?name=${e.type}`,
          }}
          key={e.id}
          className={clsx(allBlog.boxItem)}
        >
          <img
            className={clsx(allBlog.photo)}
            src={imageErrors[e.id] ? placeholderImg : e.imageUrl}
            alt={e.title}
            onError={() => handleImageError(e.id)}
            loading="lazy"
          />
          <h3 className={clsx(allBlog.titleItem)}>{e.title}</h3>
          <p className={clsx(allBlog.description)}>{e.firstDescription.slice(0, 150)}...</p>
        </Link>
      ))}
    </Container>
  );
}
