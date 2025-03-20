export const filterData = (data, filterState) => {
    return data.filter(item => {
      if (filterState === "active") {
        return item.isActive; 
      } else if (filterState === "inactive") {
        return !item.isActive;
      } else {
        return true;
      }
    });
  };