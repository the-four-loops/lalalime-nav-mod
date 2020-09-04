CREATE TABLE clothes (
    item int not null,
    gender VARCHAR(255) NOT NULL,
    style VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

select gender, color, style, name, item 
from (select * 
from (select * 
from (select * 
from clothes where cloth_indx_col @@ to_tsquery('womens') order by item desc limit 3950) as query 
where cloth_indx_col @@ to_tsquery('leggings')) as query1 
where cloth_indx_col @@ to_tsquery('black')) as query2 
where cloth_indx_col @@ to_tsquery('21') limit 10;

select gender, color, style, name, item from (select * from clothes where cloth_indx_col @@ to_tsquery('Women') and item > 9000000 limit 300) as query where cloth_indx_col @@ to_tsquery('Black') limit 10;