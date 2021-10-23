ActiveAdmin.register Game do
  permit_params :name, :release_date, :price, :image, :genre
end
