import React, {useCallback, useState} from 'react';
import {useIndexResourceState, Card, Button, Filters, IndexTable, DatePicker, TextStyle} from '@shopify/polaris';
import moment from 'moment';


export default function IndexTableWithAllElementsExample({ onDelet, data, handleChange }) {
    const [{month, year}, setDate] = useState({month: 1, year: 2018});
    const [selectedDates, setSelectedDates] = useState({
      start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
      end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    });
  
    const handleMonthChange = useCallback(
      (month, year) => setDate({month, year}),
      [],
    );
  const customers = data;
        // console.log(data);
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);
  const [taggedWith, setTaggedWith] = useState('');
  const [queryValue, setQueryValue] = useState(null);
//   const [sortValue, setSortValue] = useState('');

  const handleTaggedWithChange = useCallback( 
    (value) => setTaggedWith(moment(value.start).format("YYYY MM DD")),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
//   const handleSortChange = useCallback((value) => setSortValue(value), []);

  const promotedBulkActions = [
    {
        content: 'Delete customers',
        onAction: () => ( onDelet(selectedResources),handleSelectionChange('') ),
    },
    
  ];


  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with OBD',
      filter: (
        <DatePicker
        month={month}
        year={year}
        onChange={ (setSelectedDates,handleTaggedWithChange ) }
        onMonthChange={handleMonthChange}
        selected={selectedDates}
      />
     
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];



  const rowMarkup = customers.map(
    ({ id,name, email, password,date}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={id}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{password}</IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card>
      <div style={{padding: '16px', display: 'flex'}}>
        <div style={{flex: 1}}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={setQueryValue}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
        <div style={{paddingLeft: '0.4rem'}}>
         
        </div>
        <div style={{paddingLeft: '0.4rem'}}>
        <Button onClick={handleChange} >Add user</Button>  
        </div>
        
      </div>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        // hasMoreItems
        // bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        lastColumnSticky
        headings={[
          {title: 'Name'},
          {title: 'Email'},
          {title: 'Password'},
          {title: 'BOD'},
        //   {title: 'Password'},
        //   {title: 'Amount spent', hidden: false},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}