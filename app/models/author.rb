class Author < ApplicationRecord
  has_many :livros, class_name: "Book"
end
