import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import {
  Fragment,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { StartupHttpService } from '../../Http/Startup/Startup.http.service';
import Pagination from '../Navigation/Pagination';
const StartupList = () => {
  const [startups, setStartups] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    const startups = async () => {
      setIsLoading(true);
      const data = await StartupHttpService.getStartups();
      console.log(data);
      setStartups(data);
      setIsLoading(false);
    };
    startups();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = startups?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const startupsData = currentPosts?.map((startup: any) => {
    return (
      <Card
        key={startup.id}
        className="w-full"
        elevation={3}
        style={{ margin: '10px' }}
      >
        <CardContent style={{ margin: '10px' }}>
          <div className="flex flex-col space-y-2 ">
            <Typography variant="subtitle2" align="left" gutterBottom>
              {startup.name}
            </Typography>
            <Typography
              className="font-size: 1rem;line-height: 1.5rem;"
              color="textSecondary"
              variant="subtitle2"
              align="left"
              gutterBottom
            >
              Founded:&nbsp;{new Date(startup.dateFounded).getFullYear()}{' '}
              |&nbsp;
              {startup.employees} Employees | {startup.totalFunding} § |{' '}
              {startup.currentInvestmentStage}
            </Typography>
            <Typography
              className="font-size: 1rem;line-height: 1.5rem;"
              gutterBottom
            >
              {startup.shortDescription}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  });
  return (
    <Fragment>
      {isLoading && (
        <div className="text-center m-4">
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
            style={{ marginBottom: 6 }}
          />
        </div>
      )}
      {!isLoading && startupsData}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={startups?.length}
        paginate={paginate}
      />
    </Fragment>
  );
};

export default StartupList;
