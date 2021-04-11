import { useState } from 'react';

import { Input, Label, Span } from '../Atoms';
import '../../styles/search.scss';

const SearchTodo = props => {
    const { data } = props;
    const [searchOp, setSearchOp] = useState({ text: '', result: [] }); // search Feature

    // Search Feature
      const handleSearch = value => {
        setSearchOp({...searchOp, text: value });
        filterData(value);
    };
    
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        let updateList = props.data;
        updateList = updateList.filter(item => {
          return item['title'].toLowerCase().search(lowercasedValue) !== -1;
        });
        console.log(updateList)
        setSearchOp({...searchOp, result: [...updateList]});
    };   

    return  <>
              <div className='todo__search'>
                  <Label id='search' label='Search' />
                  <Input type='text' name='search' placeholder='Type to search...' value={searchOp.text} 
                        onChange={e => handleSearch(e.target.value)} id='search' />
              </div>

              <div className='todo__searach__suggestion'>
                { (Array.isArray(searchOp.result) && searchOp.result.length > 0) ?
                    <Span label={`Suggestions: ${searchOp.result.length}`} /> : '' }
              </div>
            </>
};

export default SearchTodo;