select *
from products
where product_id = $1; 

-- returns specific product from the products table if it matches a spcific id