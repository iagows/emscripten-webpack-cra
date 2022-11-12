#include <iostream>
#include <vector>
#include <numeric>

#include <emscripten/bind.h>

using namespace emscripten;

struct Point {
  int x;
  int y;
};

int my_add(int a, int b) {
  std::cout << "Hello CPP\n";
  return a + b;
}

Point accumulatePoints(std::vector<Point> &points) {
  return std::accumulate(points.begin(), points.end(), Point{ 0, 0 }, [](Point const &a, Point const &b) {
    return Point{ a.x + b.x, a.y + b.y };
  });
}

EMSCRIPTEN_BINDINGS(my_module) {
  function("my_add", &my_add);
  value_object<Point>("Point")
    .field("x", &Point::x)
    .field("y", &Point::y)
    ;
  register_vector<Point>("VectorPoint");
  function("accumulatePoints", &accumulatePoints);
}
