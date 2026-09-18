import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import fetchBlog from '../../store/async/blogDataThunk';
import { filterInfo } from '../../store/slices/blogSlice';
import blog from './BlogPages.module.css';
import Container from '../../Components/Container';
import placeholderImg from '@assets/placeholder.webp';
import { blogDataFetchState } from '../../store/selectors';
import { IoArrowBack, IoTimeOutline, IoCalendarOutline } from 'react-icons/io5';

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

  const currentBlog = filterBlogResult?.[0] || blogDataFetch?.[0];
  const imageSrc = currentBlog?.imageUrl || placeholderImg;

  return (
    <article className={clsx(blog.blogSection)}>
      <Container className={clsx(blog.blogContainer)}>
        <Link to="/blog" className={clsx(blog.backBtn)}>
          <IoArrowBack size={16} />
          <span>Back to Atelier Journal</span>
        </Link>

        {currentBlog ? (
          <div className={clsx(blog.articleWrapper)}>
            <header className={clsx(blog.articleHeader)}>
              <span className={clsx(blog.categoryBadge)}>
                {currentBlog.type || 'Editorial Essay'}
              </span>
              <h1 className={clsx(blog.title)}>{currentBlog.title}</h1>

              <div className={clsx(blog.metaBar)}>
                <div className={clsx(blog.metaItem)}>
                  <IoCalendarOutline size={14} />
                  <span>Spring/Summer Edition</span>
                </div>
                <div className={clsx(blog.metaItem)}>
                  <IoTimeOutline size={14} />
                  <span>5 Min Read</span>
                </div>
                <div className={clsx(blog.metaItem)}>
                  <span>By EvaShop Atelier Editorial</span>
                </div>
              </div>
            </header>

            <div className={clsx(blog.heroImageWrap)}>
              <img
                src={imageSrc}
                alt={currentBlog.title || 'Blog image'}
                onError={handleImageError}
                className={clsx(blog.heroImage)}
              />
            </div>

            <div className={clsx(blog.articleBody)}>
              <p className={clsx(blog.leadParagraph)}>{currentBlog.firstDescription}</p>

              <blockquote className={clsx(blog.quoteBox)}>
                <p>
                  "A timeless wardrobe does not follow the fleeting noise of micro-trends; it is
                  rooted in structural integrity, noble fabrics, and effortless composure."
                </p>
                <cite>— EVA Creative Direction</cite>
              </blockquote>

              <p className={clsx(blog.bodyParagraph)}>
                Our seasonal research delves deep into the interplay of tailored drapery and tactile
                materials. Whether opting for crisp poplin, weighted silk twill, or structured wool
                melton, every piece is sculpted to move with absolute fluidity.
              </p>

              <div className={clsx(blog.footerActions)}>
                <Link to="/catalog" className={clsx(blog.shopRelatedBtn)}>
                  Shop Pieces From This Story
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={clsx(blog.loadingState)}>Loading essay...</div>
        )}
      </Container>
    </article>
  );
}
