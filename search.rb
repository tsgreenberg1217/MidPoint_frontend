
class Search
  attr_accessor :term, :location, :results
  attr_reader :average_rating, :price

  def initialize(lat, lng, term=nil)

    @term = term
    @location = "#{lat}, #{lng}"
    @results = API.test(@term, @location)
  end


end
