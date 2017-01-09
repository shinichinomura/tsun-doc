class CreateAmazonBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :amazon_books do |t|
      t.string :asin, null: false, limit: 16
      t.string :title, null: false, limit: 512
      t.string :url, null: false, limit: 2048

      t.index :asin, unique: true

      t.timestamps null: false
    end
  end
end
