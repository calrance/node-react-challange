import { useNavigate } from '@tanstack/react-router';
import { Button, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from 'react';
import TinyBarChart from '../components/TinyBarChart';
import AuthContext from '../context/AuthProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import IBook from '../models/book.interface';

function getGenreList(booklist: IBook[]) {
  const genreCount = booklist?.reduce((count: any, book: IBook) => {
    if (book.genre) {
      count[book.genre] = (count[book.genre] || 0) + 1;
    }
    return count;
  }, {});

  // Convert to an arrayList
  const arrayList = Object.entries(genreCount).map(([genre, count]) => ({
    name: genre,
    value: count,
  }));

  console.log('genreCount >> ' + JSON.stringify(genreCount));
  console.log('arrayList >> ' + JSON.stringify(arrayList));

  return arrayList;
}

function Dashboard() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [booklist, setBooklist] = useState<IBook[]>([]);
  const [filteredBooklist, setFilteredBooklist] = useState<any>([]);
  const [genrelist, setGenrelist] = useState<any>([]);
  const axiosPrivate = useAxiosPrivate();
  const [options, setOptions] = useState<any[]>([]);

  const onChange = (value: string) => {
    if (value === 'All') {
      setFilteredBooklist(booklist);
    } else {
      setFilteredBooklist(
        booklist.filter((booklist: any) => booklist.genre === value)
      );
    }
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const logout = async () => {
    setAuth({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axiosPrivate.get('/logout');

    navigate({
      to: '/login',
    });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllBooks = async () => {
      try {
        const response = await axiosPrivate.get('/book', {
          signal: controller.signal,
        });
        if (isMounted) {
          setBooklist(response.data);
          setFilteredBooklist(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getAllBooks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  useEffect(() => {
    const selectOptions = (): any => {
      if (!booklist) return [];

      const genres = booklist
        ?.map((book: any) => book.genre)
        .filter(
          (genre: any, index: any, self: any) => self.indexOf(genre) === index
        );

      const options = genres.map((genre: any) => ({
        value: genre,
        label: genre,
      }));

      options.unshift({
        value: 'All',
        label: 'All',
      });

      return options;
    };

    setOptions(selectOptions());
    setGenrelist(getGenreList(booklist));
  }, [booklist]);

  const columns: ColumnsType<IBook> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      align: 'center',
    },
    {
      title: 'Price (RM)',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      align: 'center',
      sorter: (a, b) => a.stock - b.stock,
    },
  ];

  return (
    <>
      <div className='bg-primary'>
        <div className='container mx-auto'>
          <header className='flex justify-between items-center py-4'>
            <p className='text-white'>Welcome to Bookstore Backoffice</p>
            <Button
              className='px-10'
              style={{ color: 'white' }}
              onClick={logout}
            >
              Logout
            </Button>
          </header>
        </div>
      </div>
      <div className='container mx-auto py-10'>
        <div className='bg-white p-10 rounded-md'>
          <h1 className='mb-4 text-3xl'>Dashboard</h1>

          <div className='border raounded-md p-4 mb-20'>
            <div className='text-center text-2xl font-bold'>Genre</div>
            <TinyBarChart data={genrelist} key={genrelist}/>
          </div>

          <div className='flex items-center mb-4'>
            <p className='font-bold mr-3'>Filter By Genre</p>
            <Select
              showSearch
              placeholder='Select a genre'
              optionFilterProp='children'
              defaultValue='All'
              onChange={onChange}
              filterOption={filterOption}
              options={options}
              style={{ width: 200 }}
            />
          </div>

          {filteredBooklist.length > 0 && (
            <Table
              columns={columns}
              dataSource={filteredBooklist}
              rowKey={(filteredBooklist) => filteredBooklist.id}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
