class CreateBookcases < ActiveRecord::Migration[8.0]
  def change
    create_table :bookcases do |t|
      t.integer :limit

      t.timestamps
    end
  end
end
