package nodeIP

import (
	"testing"

	"k8s.io/client-go/tools/clientcmd"
)

func TestWorkload(t *testing.T) {
	k8scfg, err := clientcmd.BuildConfigFromFlags("", "path/to/config")
	if err != nil {
		t.Fatal(err)
	}
}
