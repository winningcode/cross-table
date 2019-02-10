import React from 'react';

import  './Table.css';

const table = (props) => {
   const columns = props.columns;
   
   var currencies = (<thead>
         <tr>
            <th></th>
            <th></th>
           {columns.map(function(column) {
            const iconClass = "icon-flag icon-flag-" + column.toLowerCase();
             return <th><i className={iconClass}></i>{column}</th>; })
            }
         </tr>
     </thead>);

   var currenciesValues = props.rows.map(function(row) {
       const cssClass = "icon-flag icon-flag-" + row['base'].toLowerCase();
     return (
         
       <tr>
            <th><i className={cssClass}></i></th>
            <td>1 {row['base']} = <br /> Inverse</td>
            {columns.map(function(column) {
                let sameCurrClass = "";
                if(row['base'] === column){
                    sameCurrClass = 'sameCurrency';
                }
                return <td className={sameCurrClass}>{row[column].toFixed(4)} <br />{row[row['base']].toFixed(4)}</td>; 
            })}
       </tr>
      
       ); 
    });
    
  
   return (<table className="table table-bordered table-hover" width="100%">
       {currencies}
       <tbody>
        {currenciesValues}
       </tbody>
     </table>);
};

export default table;