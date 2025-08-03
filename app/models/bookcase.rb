class Bookcase < ApplicationRecord
  has_many :books
  validates :name, presence: true
  validates :limit, presence: true, numericality: { greater_than: 0 }
end
