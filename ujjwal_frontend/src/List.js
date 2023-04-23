import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  id,
  body,
  email,
  name



}) => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',overflowY:'scroll'}}>
      <div class="card" style={{ width: '50rem'}}>
        <div class="card-header" style={{color:'blue'}}>
          <b>Comment :</b>&nbsp;{id}
        </div>
        <div class="card-body">
          <h5 class="card-title">{email}</h5>
          <p class="card-text">{body}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,


};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
      console.log(response.data)
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredItems = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(searchQuery.toLowerCase())

    );
  });

  return (
    <div >
      <input type="text" value={searchQuery} placeholder='Search User.....'  onChange={handleSearch}style={{  width: '300px', marginBottom: '50px', marginleft: '50px',borderRadius:'5px' }} />
      
      <div style={{ textAlign: 'left' }}>
        {filteredItems.map((item, index) => (
          <SingleListItem
            key={index}
            onClickHandler={() => handleClick(index)}
            index={index}
            id={item.id}
            name={item.name}
            email={item.email}
            body={item.body}

            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
