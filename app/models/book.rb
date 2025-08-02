class Book < ApplicationRecord
  belongs_to :bookcase
  belongs_to :author
end
