class Author < ApplicationRecord
  has_many :books
  validate :name, unique: true
end
