import ContentLoader from 'react-content-loader';

export const ItemPlaceholder = (props) => (
  <ContentLoader className='pizza-block' speed={2} width={280} height={459} viewBox='0 0 280 459' backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
    <circle cx='140' cy='122' r='122' />
    <rect x='0' y='271' rx='5' ry='5' width='280' height='24' />
    <rect x='0' y='317' rx='10' ry='10' width='280' height='85' />
    <rect x='0' y='426' rx='5' ry='5' width='89' height='27' />
    <rect x='125' y='419' rx='20' ry='20' width='155' height='40' />
  </ContentLoader>
);
